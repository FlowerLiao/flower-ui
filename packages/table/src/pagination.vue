
 <template>
	<div class="pagination">
		<template v-if="(show && show != 'false') || show == undefined">
			<template v-if="totalRow">
				<select class="pageSize" v-model="pageSize" v-on:change="goToPage(1)">
					<option v-for="size in pageSizes" v-bind:value="size">{{size}}</option>
				</select>
				<ul><li class="total">Total: {{totalRow}}</li>

					<li v-on:click="goToPage(current - (current == 1 ? 0 : 1))"><a><i class="kf-icon-angle_left"></i></a></li>

					<template v-for="(item,index) in new Array(totalPages)">
						<!-- current page -->
						<li v-if="(index + 1) == current">
							<span class="current">{{index + 1}}</span>
						</li>
						<!-- first&last page -->
						<li v-else-if="index == 0 || index == (totalPages - 1)" v-on:click="goToPage(index + 1)">
							<a>{{index + 1}}</a>
						</li>
						<!-- page 1-5 -->
						<template v-else-if="current <= 5">
							<li v-if="index < 6" v-on:click="goToPage(index + 1)"><a>{{index + 1}}</a></li>
							<li v-else-if="index == 7">...</li>
						</template>
						
						<!-- page 5-totalPages -->
						<template v-else-if="current > 5">
							<template v-if="(totalPages - current) < 4">
								<li v-if="(totalPages - index) == 7">...</li>
								<li v-else-if="(totalPages - index) < 7" v-on:click="goToPage(index + 1)"><a>{{index + 1}}</a></li>
							</template>
							<template v-else>
								<template v-if="current - index > 1">
									<li v-if="(current - index) < 5" v-on:click="goToPage(index + 1)"><a>{{index + 1}}</a></li>
									<li v-else-if="(current - index) == 5">...</li>
								</template>

								<template v-else-if="current - index < 1">							
									<li v-if="(index - current) < 2" v-on:click="goToPage(index + 1)"><a>{{index + 1}}</a></li>
									<li v-else-if="(index - current ) == 2">...</li>
								</template>
							</template>
						</template> 
					</template>

					<li v-on:click="goToPage(current + (current == totalPages ? 0 : 1))"><a><i class="kf-icon-angle_right"></i></a></li>
				</ul>
			</template>
			
			<template v-else>
				<div class="no-data">No matching recoreds found.</div>
			</template>
		</template>
		<template v-else-if="!totalRow">
			<div class="no-data">No matching recoreds found.</div>
		</template>
	</div>
</template>	

<script type="text/javascript">
	export default {
		name: 'FlPagination',
		props: {
			"page": Number,
			"size": Number,
			"totalRow": Number,
			"totalPage": Number,
			"pageClick": Function,
			"show": true
		},
		data(){
			return {
				pageSizes: [20,50,100,500],
				pageSize: 20,
				current: 1,
				totalPages: 0
			}
		},
		watch: {
			size: function(value){
				this.pageSize = value;
				this.getTotalPages();
			},
			page: function(value){
				this.current = value;
			},
			totalPage: function(value){
				this.getTotalPages();
			},
			totalRow: function(value){
				this.getTotalPages();
			}
		},
		created: function(){
			this.pageSize = this.size;
			this.current = this.page;
			this.getTotalPages();
		},
		methods: {
			getTotalPages: function(){
				this.totalPages = this.totalPage || Math.ceil(this.totalRow / this.size);
			},
			goToPage: function(page){
				if(page == this.current && this.pageSize == this.size){
					return false;
				}
				this.current = page;
				this.pageClick(page || 1,this.pageSize);
			}
		}
	}
</script>