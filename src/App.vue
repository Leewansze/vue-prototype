<template>
	 <a-locale-provider :locale="locale">
  	<div id="app">
    		<router-view/>
  	</div>
	</a-locale-provider>
</template>

<script>


export default {
  name: 'App',
};
</script>

<style>
#app {
	/*width:1440px;
	margin:auto;*/
	overflow: hidden;
}
</style>
