<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<h2>{{ post.title }}</h2>
		<p>id: {{ props.id }}, isOdd: {{ isOdd }}</p>
		<p>{{ post.content }}</p>
		<p class="text-muted">
			{{ $dayjs(post.createdAt).format('YYYY. MM. DD HH:mm:ss') }}
		</p>
		<hr class="my-4" />
		<AppError v-if="removeError" :message="removeError.message" />
		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="router.push('/posts/10')">
					이전글
				</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="router.push('/posts/11')">
					다음글
				</button>
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
				<button
					class="btn btn-outline-danger"
					@click="remove"
					:disabled="removeLoading"
				>
					<template v-if="removeLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else>삭제</template>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { deletePost } from '@/api/posts';
import { ref } from 'vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';
import { computed } from 'vue';
import { useNumber } from '@/composables/number';
import { toRef } from 'vue';
import { toRefs } from 'vue';

//넘어온 props 정의
const props = defineProps({
	id: [String, Number],
});

const router = useRouter();
// const isRef = toRef(props, 'id');
const { id: isRef } = toRefs(props);
const { x, y } = useNumber(isRef);
const { vAlert, vSuccess } = useAlert();
//url을 반응형으로 넘겨야 버튼을 클릭할 때마다 preview가 바뀐다
const url = computed(() => `/posts/${props.id}`);

//data 값을 post에 바로 할당한다.
const { error, loading, data: post } = useAxios(url);

const {
	error: removeError,
	loading: removeLoading,
	execute,
} = useAxios(
	`/posts/${props.id}`,
	{ method: 'delete' },
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('삭제가 완료되었습니다.');
			router.push({ name: 'PostList' });
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

// const post = ref({
// 	title: null,
// 	content: null,
// 	createdAt: null,
// });

const remove = async () => {
	if (confirm('삭제 하시겠습니까?') === false) {
		return;
	}
	execute();
};

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
	router.push({ name: 'PostEdit', params: { id: props.id } });

onBeforeRouteUpdate(() => {
	console.log('onBeforeRouteUpdate');
});
onBeforeRouteLeave(() => {
	console.log('onBeforeRouteLeave');
});
</script>
<script>
export default {
	beforeRouteEnter() {
		console.log('beforeRouteEnter');
	},
};
</script>

<style scoped></style>
