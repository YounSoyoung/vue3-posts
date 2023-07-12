<template>
	<div>
		<ul class="nav nav-pills">
			<li class="nav-item">
				<!-- route.push가 아닌 replace(replace:ture)를 사용하면 -->
				<!-- 예) About 페이지 => Nested 페이지 => Nested One 버튼/페이지 => Nested Two 버튼/페이지 -->
				<!-- 1. stack - about > NestedHome -->
				<!-- 2. stack - about > NestedOne -->
				<!-- 3. stack - about > NestedTwo -->
				<!-- 이 순서대로 히스토리 스택이 쌓이기 때문에 뒤로가기 하면 about페이지로 이동 -->
				<RouterLink
					class="nav-link"
					active-class="active"
					:to="{ name: 'NestedOne', replace: true }"
					>Nested One</RouterLink
				>
			</li>
			<li class="nav-item">
				<RouterLink
					class="nav-link"
					active-class="active"
					:to="{ name: 'NestedTwo', replace: true }"
					>Nested Two</RouterLink
				>
			</li>
		</ul>
		<hr class="my-4" />
		<RouterView></RouterView>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
