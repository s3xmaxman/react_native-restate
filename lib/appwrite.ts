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
  /**
   * アプリケーションのプラットフォームID。
   */
  platform: "com.restate.s3xmaxman",
  /**
   * AppwriteのエンドポイントURL。
   */
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  /**
   * AppwriteのプロジェクトID。
   */
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  /**
   * AppwriteのデータベースID。
   */
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  /**
   * ギャラリーコレクションのID。
   */
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  /**
   * レビューコレクションのID。
   */
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  /**
   * エージェントコレクションのID。
   */
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  /**
   * プロパティコレクションのID。
   */
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
  /**
   * ストレージバケットのID。
   */
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
};

/**
 * Appwriteクライアントのインスタンス。
 */
export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

/**
 * アバター関連の操作を行うためのAvatarsインスタンス。
 */
export const avatar = new Avatars(client);
/**
 * アカウント関連の操作を行うためのAccountインスタンス。
 */
export const account = new Account(client);
/**
 * データベース関連の操作を行うためのDatabasesインスタンス。
 */
export const databases = new Databases(client);
/**
 * ストレージ関連の操作を行うためのStorageインスタンス。
 */
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
      throw new Error("Something went wrong");
    }

    // 認証セッションを開く
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    // 認証セッションが失敗した場合、エラーをスロー
    if (browserResult.type !== "success") {
      throw new Error("Create OAuth2 token failed");
    }

    // URLからシークレットとユーザーIDを取得
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    // シークレットまたはユーザーIDがnullの場合、エラーをスロー
    if (!secret || !userId) {
      throw new Error("Create OAuth2 token failed");
    }

    // セッションを作成
    const session = await account.createSession(secret, userId);

    // セッションがnullの場合、エラーをスロー
    if (!session) {
      throw new Error("Failed to create session");
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
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
    console.log(error);
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