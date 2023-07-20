<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />

		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		></PostFilter>

		<hr class="my-4" />

		<AppLoading v-if="loading" />

		<AppError v-else-if="error" :message="error.message" />

		<template v-else>
			<AppGrid :items="posts">
				<template v-slot="{ item }">
					<PostItem
						:title="item.title"
						:content="item.content"
						:created-at="item.createdAt"
						@click="goPage(item.id)"
						@modal="openModal(item)"
						@preview="selectPreview(item.id)"
					></PostItem>
				</template>
			</AppGrid>

			<AppPagination
				:current-page="params._page"
				:page-count="pageCount"
				@page="page => (params._page = page)"
			/>
		</template>

		<Teleport to="#modal">
			<PostModal
				v-model="show"
				:title="modalTitle"
				:content="modalContent"
				:created-at="modalCreatedAt"
			/>
		</Teleport>

		<template v-if="previewId">
			<hr class="my-5" />
			<AppCard>
				<PostDetailView :id="previewId"></PostDetailView>
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import PostItem from '../../components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import PostModal from '@/components/posts/PostModal.vue';
// import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';
import PostFilter from '@/components/posts/PostFilter.vue';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();

const previewId = ref(null);
const selectPreview = id => (previewId.value = id);

const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 3,
	title_like: '',
});

const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/posts', { params });
// = useAxios('/posts', { method: 'get', params }); //메소드 get은 자주 사용하기 때문에 default로 설정

//pagination
const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

//fetchPosts 안에서 사용하고 있는 반응형 상태가 변경되었을 때
//해당 콜백 함수(fetchPosts)를 다시 실행할 수 있다.
// watchEffect(fetchPosts);
// fetchPosts();

const goPage = id => {
	// router.push(`/posts/${id}`);
	// http://localhost:5173/posts/1?searchText=hello#world
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});
};

//modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');

const openModal = ({ title, content, createdAt }) => {
	show.value = true;
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = createdAt;
};
// const closeModal = () => (show.value = false);
</script>

<style lang="scss" scoped></style>
