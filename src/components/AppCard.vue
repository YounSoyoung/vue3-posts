<template>
	<div class="card">
		<!-- v-if=$slots.header : 이러한 슬롯이 없을 때는 랜더링하지 않는다 -->
		<div v-if="$slots.header" class="card-header">
			<slot name="header"></slot>
		</div>
		<div v-if="$slots.default" class="card-body">
			<slot></slot>
		</div>
		<div v-if="$slots.footer" class="card-router">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
