import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Storage,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

/**
 * Appwriteの設定を保持するオブジェクト。
 */
export const config = {
  platform: "com.s3xmaxman.react_native_restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
};

/**
 * userIdをAppwriteの要件に適合するように変換する関数
 */
function normalizeUserId(userId: string): string {
  // 許可された文字のみを保持（a-z, A-Z, 0-9, ., -, _）
  let normalized = userId.replace(/[^a-zA-Z0-9._-]/g, "");

  // 先頭が英数字でない場合は修正
  if (!/^[a-zA-Z0-9]/.test(normalized)) {
    normalized = "u" + normalized.replace(/^[^a-zA-Z0-9]+/, "");
  }

  // 連続する特殊文字を単一の文字に置換
  normalized = normalized
    .replace(/\.{2,}/g, ".")
    .replace(/-{2,}/g, "-")
    .replace(/_{2,}/g, "_");

  // 長さを36文字以内に制限
  return normalized.substring(0, 36);
}

/**
 * userIdのバリデーションを行う関数
 */
function validateUserId(userId: string): boolean {
  const regex = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,35}$/;
  return regex.test(userId);
}

/**
 * Appwriteクライアントのインスタンス。
 */
export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

/**
 * Google OAuthを使用してユーザーをログインさせます。
 * @returns {Promise<boolean>} - ログインが成功した場合はtrue、それ以外の場合はfalseを返します。
 */
export async function login() {
  try {
    // リダイレクトURIを作成
    const redirectUri = Linking.createURL("/");

    // OAuth2トークンを作成
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    // レスポンスがnullの場合、エラーをスロー
    if (!response) {
      throw new Error("OAuth2トークンの作成に失敗しました");
    }

    // 認証セッションを開く
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    // 認証セッションが失敗した場合、エラーをスロー
    if (browserResult.type !== "success") {
      throw new Error("認証セッションの開始に失敗しました");
    }

    // URLからシークレットとユーザーIDを取得
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    let userId = url.searchParams.get("userId")?.toString();

    // シークレットまたはユーザーIDがnullの場合、エラーをスロー
    if (!secret || !userId) {
      throw new Error("シークレットまたはユーザーIDがnullです");
    }

    // userIdから#を削除
    userId = userId.replace(/#/g, "");

    // userIdを正規化
    userId = normalizeUserId(userId);

    // 正規化後のuserIdをログに記録
    console.log("Normalized userId:", userId);

    // userIdのバリデーション
    if (!validateUserId(userId)) {
      throw new Error(
        "無効なユーザーID形式です。ユーザーIDは36文字以内で、a-z、A-Z、0-9、ピリオド、ハイフン、アンダースコアのみ使用可能で、特殊文字で始めることはできません"
      );
    }

    // ゲストユーザーのスコープを設定
    await account.updatePrefs({
      scopes: ["account"],
    });

    // セッションを作成
    const session = await account.createSession(secret, userId);

    // セッションがnullの場合、エラーをスロー
    if (!session) {
      throw new Error("セッションの作成に失敗しました");
    }

    return true;
  } catch (error) {
    console.error("ログインエラー:", error);
    throw error;
  }
}

/**
 * 現在のユーザーセッションを削除してログアウトします。
 * @returns {Promise<boolean>} - ログアウトが成功した場合はtrue、それ以外の場合はfalseを返します。
 */
export async function logout() {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error("ログアウトエラー:", error);
    return false;
  }
}

/**
 * 現在のユーザー情報を取得します。
 * @returns {Promise<object|null>} - ユーザー情報オブジェクト、またはユーザーがログインしていない場合はnullを返します。
 */
export async function getCurrentUser() {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = await avatar.getInitials(response.name);

      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
