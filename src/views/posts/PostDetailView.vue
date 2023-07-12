<template>
	<div>
		<h2>{{ form.title }}</h2>
		<p>{{ form.content }}</p>
		<p class="text-muted">{{ form.createdAt }}</p>
		<hr class="my-4" />
		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-danger">삭제</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getPostById } from '@/api/posts';
import { ref } from 'vue';

//넘어온 props 정의
const props = defineProps({
	id: String,
});

const router = useRouter();
//url에 입력한 params 중 id 값
// const id = route.params.id;
const form = ref({});
//이전에 반응형 기초를 배울 때 Primitive type(string, number...)은 ref로 선언
//배열이나 객체는 reactive() 함수를 사용했다

/**
 * ref
 * 장) 객체 할당 가능 (반응형 -> 변경 가능), 일관성 유지(Reference type, Primitive type 둘다 가능)
 * 단) form.value.title, form.value.content -> 너무 길어진다
 *
 * reactive
 * 단) 객체 할당 불가능 (반응형 X -> 객체 안의 속성들을 변경할 수 없다)
 * 장) form.title, form.content -> 비교적 짧다
 */

const fetchPost = () => {
	const data = getPostById(props.id);
	// ...을 통해 객체 복사를 하여 form.value에 대입 -> 값의 변동을 막기 위해
	form.value = { ...data };
};
fetchPost();

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
	router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style scoped></style>
