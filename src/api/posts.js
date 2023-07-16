import axios from 'axios';

//axios
const posts = [
	{ id: 1, title: '제목1', content: '내용1', createdAt: '2021-01-01' },
	{ id: 2, title: '제목2', content: '내용2', createdAt: '2022-01-02' },
	{ id: 3, title: '제목3', content: '내용3', createdAt: '2023-01-03' },
	{ id: 4, title: '제목4', content: '내용4', createdAt: '2024-01-04' },
	{ id: 5, title: '제목5', content: '내용5', createdAt: '2025-01-05' },
];

export function getPosts() {
	return axios.get('http://localhost:5000/posts');
}

// PostDetailView.vue의 파라미터 id는 String으로 반환이된다.
// 타입을 int로 바꿔준다.
export function getPostById(id) {
	return axios.get(`http://localhost:5000/posts/${id}`);
}

export function createPost(data) {
	return axios.post('http://localhost:5000/posts', data);
}

export function updatePost(id, data) {
	return axios.put(`http://localhost:5000/posts/${id}`, data);
}

export function deletePost(id) {
	return axios.delete(`http://localhost:5000/posts/${id}`);
}
