import { firestore, functions, firestoreUserRef } from "./index";
import { ResponseCodes } from "./responseCode";

/**
 * 1-00. 사용자 로그인 처리
 */
export const loginWithGoogle = functions.https.onCall(async (data) => {
    try {
        const idToken = data.idToken;
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const userId = decodedToken.uid;

        // 사용자 등록 확인
        const userRef = admin.firestore().collection("users").doc(userId);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) { // 사용자가 등록되지 않았을 경우
            await userRef.set({
                nickname: "",
                thumbnail: "",
                age: 0,
                gender: "",
                travel_style: [],
                liked_posts: []
            });
            return { success: true, result: "User nickname not set" };
        } else if (userSnapshot.data()?.nickname == "") { // 사용자가 등록되어있지만 닉네임이 설정되어있지 않을 경우
            return { success: true, result: "User nickname not set" };
        }
        else if (userSnapshot.data()?.age == 0) { // 사용자가 등록되어있지만 세부정보가 설정되어있지 않을 경우
            return { success: true, result: "User detail info not set" };
        }
    } catch (error: unknown) {
        console.log(error);
        return { success: false, error: "Unknown error" };
    }
});

/**
 * 1-01. 새로운 사용자 생성
 */
export const createUser = functions.https.onCall(async (data, context) => {
    try {
        const userId = data.user_id
        const user = data.user;
        const newUserRef = firestoreUserRef.doc(userId);
        await newUserRef.set(user);
        return { success: true, userId: newUserRef.id };
    } catch (error) {
        return { success: false, error };
    }
});

/**
 * 1-03. 특정 사용자 닉네임 설정
 */
export const updateUserNickname = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 1-04. 특정 사용자 세부정보 설정
 */
export const updateUserDetailInfo = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 1-07. 특정 사용자가 특정 게시글 좋아요 추가
 */
export const likePost = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 1-08. 특정 사용자가 게시글 좋아요 취소
 */
export const cancelLikePost = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});

/**
 * 1-10. 특정 사용자 취향에 맞는 게시글 불러오기
 */
export const getPostByUserPreference = functions.https.onCall(async (data, context) => {
    try {
    } catch (error) {
    }
});