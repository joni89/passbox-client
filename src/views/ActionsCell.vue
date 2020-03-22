<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<div class="text-center">

		<v-tooltip bottom :disabled="isMobileDevice">
			<template v-slot:activator="{ on }">
				<v-btn icon small v-on="on" @mousedown="showPassword" @touchstart="showPassword">
					<v-icon color="primary">remove_red_eye</v-icon>
				</v-btn>
			</template>
			Ver contraseña
		</v-tooltip>

		<v-tooltip bottom :disabled="isMobileDevice">
			<template v-slot:activator="{ on }">
				<v-btn icon small v-on="on" @click="copyToClipboard">
					<v-icon color="primary">file_copy</v-icon>
				</v-btn>
			</template>
			Copiar contraseña
		</v-tooltip>

		<v-tooltip bottom :disabled="isMobileDevice">
			<template v-slot:activator="{ on }">
				<v-btn icon small v-on="on" @click="edit">
					<v-icon color="success darken-1">edit</v-icon>
				</v-btn>
			</template>
			Editar
		</v-tooltip>

		<v-tooltip bottom :disabled="isMobileDevice">
			<template v-slot:activator="{ on }">
				<v-btn icon small v-on="on" @click="remove">
					<v-icon color="error">delete</v-icon>
				</v-btn>
			</template>
			Eliminar
		</v-tooltip>

	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import HelloWorld from '@/components/HelloWorld.vue';
	import {isMobileDevice} from '@/util/device-type-detection';

	@Component({
		components: {
			HelloWorld,
		},
	})
	export default class MainView extends Vue {

		private isMobileDevice: boolean = isMobileDevice();

		private copyToClipboard(): void {
			this.$emit('copy-password');
		}

		private mounted(): void {
			window.addEventListener('mouseup', this.hidePassword);
			window.addEventListener('touchend', this.hidePassword);
		}

		private destroyed(): void {
			window.removeEventListener('mouseup', this.hidePassword);
			window.removeEventListener('touchend', this.hidePassword);
		}

		private showPassword(): void {
			this.$emit('show-password');
		}

		private hidePassword(): void {
			this.$emit('hide-password');
		}

		private edit(): void {
			this.$emit('edit');
		}

		private remove(): void {
			this.$emit('remove');
		}

	}
</script>
