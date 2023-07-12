<template>
	<div class="text-center py-5">
		<h1>Oops!</h1>
		<h2>404 Not Found</h2>
		<div class="text-muted">요청한 페이지를 찾을 수 없습니다!</div>
		<div class="mt-4">
			<!-- RouterLink로 홈으로 이동한다, 라우터 링크를 버튼으로 하고 싶다면 슬롯으로 넣으면 된다-->
			<RouterLink>
				<button>HOME</button>
			</RouterLink>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
