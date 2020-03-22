<template>
	<div id="inspire">
		<v-navigation-drawer
				v-model="showingMenu"
				app
				clipped
		>
			<div class="text-center mt-8 mb-2">
				<v-btn
						rounded
						x-large
						color="grey lighten-4"
						@click="onCreateItemClick"
				>
					<v-icon color="primary" size="25">mdi-plus</v-icon>
					&nbsp;
					Crear entrada
				</v-btn>
			</div>
			<Menu></Menu>
		</v-navigation-drawer>

		<v-app-bar
				app
				color="indigo"
				dark
				clipped-left
		>
			<v-app-bar-nav-icon @click.stop="showingMenu = !showingMenu"/>
			<v-toolbar-title>
				Application
			</v-toolbar-title>
		</v-app-bar>

		<v-content>
			<v-container
					class="fill-height"
			>
				<v-row>
					<v-col>
						<slot></slot>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
		<v-footer
				color="indigo"
				app
		>
			<span class="white--text">&copy; 2019</span>
		</v-footer>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import Menu from '@/views/Menu.vue';
	import {isMobileDevice} from '@/util/device-type-detection';

	@Component({
		components: {Menu}
	})
	export default class Layout extends Vue {

		private showingMenu: boolean = !isMobileDevice();

		private onCreateItemClick(): void {
			this.$eventBus.emit('createItem');
		}

	}
</script>
