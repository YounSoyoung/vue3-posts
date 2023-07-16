import { posts } from '.';

export function getPosts(params) {
	return posts.get('/', { params });
}

// PostDetailView.vue의 파라미터 id는 String으로 반환이된다.
// 타입을 int로 바꿔준다.
export function getPostById(id) {
	return posts.get(id + '');
}

export function createPost(data) {
	return posts.post('', data);
}

export function updatePost(id, data) {
	return posts.put(id, data);
}

export function deletePost(id) {
	return posts.delete(`/${id}`);
}
