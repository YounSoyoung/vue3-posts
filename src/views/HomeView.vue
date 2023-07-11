<template>
	<div>
		<h2>Home View</h2>
		<!-- $route: 현재 페이지 컴포넌트에 대한 정보 출력 -->
		<p>{{ $route.path }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter(); //router : HomeView
const goAboutPage = () => {
	router.push('/about');
};
</script>

<style lang="scss" scoped></style>
