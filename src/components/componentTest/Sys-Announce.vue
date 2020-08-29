<template>
	<div>
		<span class="System">System Announcements</span>
		<router-link tag="a" to="/newForm">
      <a-button class="editable-add-btn" @click="handleAdd">
        <a-icon type="plus" />New Announcement
      </a-button>
    </router-link>
		<!-- Dash -->
		<a-divider dashed />
    <!-- five Button Group -->
		<div class="btnGroup" @click="switchActiveLink(item)">
			<a-button class="btn-all">6,529<span class="fontSize">All</span></a-button>
			<a-button class="btn-pending" >7<span class="fontSize">Pending</span></a-button>
			<a-button class="btn-approved" >488<span class="fontSize">Approved</span></a-button>
			<a-button class="btn-active" >9<span class="fontSize">Active</span></a-button>
			<a-button class="btn-scheduled">488<span class="fontSize">Scheduled</span></a-button>
		</div>
    <!-- Table -->
	  <a-table
	    :columns="columns"
	    :rowKey="key"
	    :dataSource="data"
	    :pagination="pagination">
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px" >
        <a-input
          v-ant-ref="c => searchInput = c"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm)"
          style="width: 188px; margin-bottom: 8px; display: block;" 
        />
        <a-button
          type="primary"
          @click="() => handleSearch(selectedKeys, confirm)"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
        >Search</a-button>
        <a-button @click="() => handleReset(clearFilters)" size="small" style="width:90px">Reset</a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text">
        <span v-if="searchText">
          <template
            v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))" >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight">{{fragment}}
            </mark>
            <template v-else>{{fragment}}</template>
          </template>
        </span>
        <template v-else>{{text}}</template>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
	  </a-table>
	</div>
</template>
<script>
  import reqwest from 'reqwest';
  import EditableCell from './EditableCell';
	const formItemLayout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 8 },
	};
	const formTailLayout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 8, offset: 4 },
	};
  const columns=[
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      scopedSlots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'customRender',
      },
      onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          }, 0);
        }
      }
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      sorter: true,
      width: '20%',
      scopedSlots: { customRender: 'date' },
    },
    {
      title: 'Severity',
      dataIndex: 'Severity',
      width:'10%',
    },
    {
      title: 'Affected Service',
      dataIndex: 'Service',
      key: 'Affected Service',
      scopedSlots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'customRender',
      },
      onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          }, 0);
        }
      }
    },
    {
      title: 'Effective From',
      dataIndex: 'from',
      sorter: true,
      width: '12.5%',
      scopedSlots: { customRender: 'date' },
    },
    {
      title: 'Effective To',
      dataIndex: 'To',
      sorter: true,
      width: '12.5%',
      scopedSlots: { customRender: 'date' },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [{ text: 'Pending', value: 'pending' }, { text: 'Approved', value: 'Approved' },{ text: 'Active', value: 'active' }, { text: 'Scheduled', value: 'scheduled' }],
      width:'12.5%',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
  ]
  const data = [
    {
      key: '1',
      Title: 'e-Apporval unavailable due to Planned Maintena…',
      Date: '10/21/2019',
      Severity: '2',
      Service:'e-Approval',
      EffectiveFrom:'',
    },
    {
      key: '2',
      Title: 'IOCM - Latvia Customs EMDAS (ECS, ICS, NCTS …',
      Date: '10/21/2019',
      Severity: '3',
      Service:'e-Approval',
    },
    {
      key: '3',
      Title: 'NCC-COSCO-VT unavailable due to Weekend Ma…',
      Date: '10/21/2019',
      Severity: '3',
      Service:'e-Approval',
    },
    {
      key: '4',
      Title: 'NOE unavailabe due to Weekend Maintenance(1…',
      Date: '10/21/2019',
      Severity: '3',
      Service:'e-Approval',
    },
  ];
   for (let i = 0; i < 100; i++) {
    data.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  export default {
    name:'Sys-Announce',
    mounted() {
      this.fetch();
    },
    data() {
      this.cacheData = data.map(item => ({ ...item }));
      return {
        data,
        columns,
        pagination: {},
        loading: false,
        columns,
        searchText: '',
        searchInput: null,
      };
    },
    components: {
      EditableCell,
    },
    methods: {
      handleTableChange(pagination, filters, sorter) {
        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      },
      fetch(params = {}) {
        console.log('params:', params);
        this.loading = true;
        reqwest({
          url: 'https://randomuser.me/api',
          method: 'get',
          data: {
            results: 10,
            ...params,
          },
          type: 'json',
        }).then(data => {
          const pagination = { ...this.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 500;
          this.loading = false;
          this.data = data.results;
          this.pagination = pagination;
        });
      },
      handleSearch(selectedKeys, confirm) {
        confirm();
        this.searchText = selectedKeys[0];
      },
      handleReset(clearFilters) {
        clearFilters();
        this.searchText = '';
      },
      handleChange(value, key, column) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.data = newData;
        }
      },
      edit(key) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target.editable = true;
          this.data = newData;
        }
      },
      save(key) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          delete target.editable;
          this.data = newData;
          this.cacheData = newData.map(item => ({ ...item }));
        }
      },
      cancel(key) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
          delete target.editable;
          this.data = newData;
        }
      },  
    }
  };
</script>
<style lang="less">
	/*Header*/
	.System{
		font-size: 20px;
		color: #333333;
    font-family: 'Roboto Regular';
		line-height: 26px;
	}
	/*dash style*/
	.ant-divider{
		margin:19px 0 40px 0;
	}
	/* New Announcement Button*/
	.editable-add-btn,
  .editable-add-btn:hover,
  .editable-add-btn:focus{
		width:220px;
		height:42px;
		border-radius: 4px;
		font-size: 16px;
		color: #FFFFFF;
		letter-spacing: 0;
		background: #16DDC3;
		float: right;
		position:relative;
		top:-5px;
	}
	/* five button style*/
	.btnGroup .ant-btn{
		width:200px;
		height:60px;
		border-radius: 0px;
		font-size: 28px;
		margin-bottom:30px;
    .fontSize{
      display: inline-block;
      font-size:14px;
      margin-left:11px;
    }
	}
	.btn-all,.btn-all:focus{
		border: 2px dashed #3E5D74;
		color:#3E5D74;
		margin-right:40px;
		// &:active{
      background:#3E5D74;
      color:#fff;
    // }
	}
  .btn-all:hover{
    border: 2px dashed #3E5D74;
    background:#3E5D74;
    color:#fff;
  }
	.btn-pending,.btn-pending:focus{
		border: 2px dashed #FF8654;
		color:#FF8654;
		margin-right:10px;
		&:active{
			background:#FF8654;
			color:#fff;
		}
	}
  .btn-pending:hover{
    border: 2px dashed #FF8654;
    background:#FF8654;
    color:#fff;
  }
	.btn-approved,.btn-approved:focus{
		border: 2px dashed #16A085;
		color:#16A085;
		margin-right:10px;
		&:active{
			background:#16A085;
			color:#fff;
		}
	}
  .btn-approved:hover{
    border: 2px dashed #16A085;
    background:#16A085;
    color:#fff;
  }
	.btn-active,.btn-active:focus{
		border: 2px dashed #F55349;
		color:#F55349;
		margin-right:10px;
		&:active,.btnactiveActive{
			background:#F55349;
			color:#fff;
		}
	}
  .btn-active:hover{
    border: 2px dashed #F55349;
    background:#F55349;
    color:#fff;
  }
	.btn-scheduled,
  .btn-scheduled:focus,{
		border: 2px dashed #009CC7;
		color:#009CC7;
		margin-right:10px;
		&:active{
			background:#009CC7;
			color:#fff;
		}
	}
  .btn-scheduled:hover{
    border: 2px dashed #009CC7;
    background:#009CC7;
    color:#fff;
  }
  /*table search*/
  .ant-table-filter-dropdown .ant-btn-primary{
    background-color: #16DDC3;
    border: #16DDC3;;
  } 
</style>