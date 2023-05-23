/* eslint-disable */
import { admin, firestore, functions, firestorePostRef, firestoreCommentRef } from "./firebase";
import { ResponseCodes } from "./responseCode";

/**
 * 5-01. 특정 게시물과 연결된 댓글 추가
 */
// export const addComment = functions.https.onCall(async (data) => {
//     try {
//         const comment = data.comment;
//         const commentRef = firestoreCommentRef.doc();
//         const postRef = firestorePostRef.doc(comment.post_id);

//         comment.created_at = new admin.firestore.Timestamp(comment.start_date.seconds, comment.start_date.nanoseconds);

//         if (!(await postRef.get()).exists) {
//             console.log("[commentFunctions/addComment] Post not found: " + comment.post_id);
//             return { result: ResponseCodes.FAILURE, type: ResponseCodes.POST_NOT_FOUND };
//         }

//         await commentRef.set(comment);

//         console.log("[commentFunctions/addComment] Comment created: " + commentRef.id);
//         return { result: ResponseCodes.SUCCESS, data: commentRef.id };
//     } catch (error) {
//         console.log("[commentFunctions/addComment] Error: " + error);
//         return { result: ResponseCodes.FAILURE, type: ResponseCodes.SERVER_ERROR };
//     }
// });

/**
 * 5-02. 특정 댓글 수정
 */
export const updateComment = functions.https.onCall(async (data) => {
    try {
        const commentId = data.comment_id;
        const updateFields = data.update_fields;

        if (!(await firestoreCommentRef.doc(commentId).get()).exists) {
            console.log("[commentFunctions/updateComment] Comment not found: " + commentId);
            return { result: ResponseCodes.FAILURE, type: ResponseCodes.COMMENT_NOT_FOUND };
        }

        await firestoreCommentRef.doc(commentId).update(updateFields);

        console.log("[commentFunctions/updateComment] Comment updated: " + commentId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[commentFunctions/updateComment] Error: " + error);
        return { result: ResponseCodes.FAILURE, type: ResponseCodes.SERVER_ERROR };
    }
});

/**
 * 5-03. 특정 댓글 삭제
 */
export const deleteComment = functions.https.onCall(async (data) => {
    try {
        const commentId = data.comment_id;

        if (!(await firestoreCommentRef.doc(commentId).get()).exists) {
            console.log("[commentFunctions/deleteComment] Comment not found: " + commentId);
            return { result: ResponseCodes.FAILURE, type: ResponseCodes.COMMENT_NOT_FOUND };
        }

        await firestoreCommentRef.doc(commentId).delete();

        console.log("[commentFunctions/deleteComment] Comment deleted: " + commentId);
        return { result: ResponseCodes.SUCCESS };
    } catch (error) {
        console.log("[commentFunctions/deleteComment] Error: " + error);
        return { result: ResponseCodes.FAILURE, type: ResponseCodes.SERVER_ERROR };
    }
});