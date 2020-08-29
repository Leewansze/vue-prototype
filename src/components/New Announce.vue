<template>
	<a-form :form="form">
		<a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="Title:"
    >
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your name' }] },
        ]"
        placeholder="Please input your name"
      />
    </a-form-item>
	</a-form>
</template>
<script>
	export default{
		data(){
			return
		},
	};
</script>
<style>
	
</style>