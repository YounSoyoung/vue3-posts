import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutView,
	},
	{
		path: '/posts',
		name: 'PostList',
		component: PostListView,
	},
	{
		path: '/posts/create',
		name: 'PostCreate',
		component: PostCreateView,
	},
	{
		//동적 라우팅
		//:id - 파라미터, 라우터 객체에 params으로 받을 수 있다, id가 파라미터명
		path: '/posts/:id',
		name: 'PostDetail',
		component: PostDetailView,
		// id 파라미터가 PostDetailView 컴포넌트에 props로 들어간다
		props: true,
	},
	{
		path: '/posts/:id/edit',
		name: 'PostEdit',
		component: PostEditView,
	},
	// '/:pathMatch(.*)*' - 위의 어떤 경로와도 매칭되지 않은 경우 NotFoundView로 이동
	{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
	{
		path: '/nested',
		name: 'Nested',
		component: NestedView,
		children: [
			{
				path: '',
				name: 'NestedHome',
				component: NestedHomeView,
			},
			{
				// path: '/one' - one 앞에 / 넣으면 안된다, / 넣으면 절대경로가 되어버린다
				path: 'one',
				name: 'NestedOne',
				component: NestedOneView,
			},
			{
				path: 'two',
				name: 'NestedTwo',
				component: NestedTwoView,
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory('/'),
	routes,
});

export default router;
