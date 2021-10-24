<template>

  <div>

    <user-list-add-new
      v-if="userData.role_name === 'admin' || userData.role_name === 'establishment_admin'"
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :role-options="userData.role_name === 'admin' ? adminRoleOptions : establishmentRoleOptions"
      @new-users="setUsers($event)"
    />

    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Mostrar</label>
            <v-select
              v-model="pagination.per_page"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
              @input="(value)=>{handlePagination({ per_page: value, page: 1 })}"
            />
            <label>Resultados</label>
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Buscar..."
              />
              <b-button
                v-if="userData.role_name === 'admin' || userData.role_name === 'establishment_admin'"
                variant="primary"
                @click="isAddNewUserSidebarActive = true"
              >
                <span class="text-nowrap">Agregar usuario</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="users"
        :fields="tableColumns"
        responsive
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >

        <!-- Column: User -->
        <template #cell(name)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="`${data.item.logo}`"
                :text="avatarText(data.item.name)"
                :variant="`light-${resolveUserRoleVariant(data.item.role_name)}`"
              />
            </template>
            <b-link
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.name }}
            </b-link>
            <small class="text-muted">{{ data.item.email }}</small>
          </b-media>
        </template>

        <!-- Column: Role -->
        <template #cell(role_name)="data">
          <div class="text-nowrap">
            <feather-icon
              :icon="resolveUserRoleIcon(data.item.role_name)"
              size="18"
              class="mr-50"
              :class="`text-${resolveUserRoleVariant(data.item.role_name)}`"
            />
            <span class="align-text-top text-capitalize">{{ data.item.role_name }}</span>
          </div>
        </template>

        <!-- Column: phone -->
        <template #cell(phone)="data">
          <span v-if="data.item.customer">{{ data.item.customer.cel_number }}</span>
        </template>

        <!-- Column: Status -->
        <template #cell(status)="data">
          <b-badge
            pill
            :variant="`light-${resolveUserStatusVariant(data.item.active_status)}`"
            class="text-capitalize"
          >
            {{ data.item.active_status }}
          </b-badge>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item :to="{ name: 'apps-users-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="disableUser(data.item)"
            >
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ pagination.total_objects }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="pagination.page"
              :total-rows="pagination.total_objects"
              :per-page="pagination.per_page"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
              @change="(value)=>{handlePagination({ page: value, per_page: pagination.per_page })}"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'
import _ from 'underscore'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import { mapActions } from 'vuex'
import useUsersList from './useUsersList'
import userStoreModule from '../userStoreModule'
import UserListAddNew from './UserListAddNew.vue'

export default {
  components: {
    UserListAddNew,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,

    vSelect,
  },
  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    const isAddNewUserSidebarActive = ref(false)

    const adminRoleOptions = [
      { label: 'Admin', value: 'admin' },
      { label: 'Administrador de establecimiento', value: 'establishment_admin' },
      { label: 'Cajero', value: 'store_clerk' },
      { label: 'Cliente', value: 'customer' },
    ]
    const establishmentRoleOptions = [
      { label: 'Administrador de establecimiento', value: 'establishment_admin' },
      { label: 'Cajero', value: 'store_clerk' },
    ]

    const statusOptions = [
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]

    const {
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
    } = useUsersList()

    return {

      // Sidebar
      isAddNewUserSidebarActive,

      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      adminRoleOptions,
      establishmentRoleOptions,
      statusOptions,

      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
    }
  },
  data() {
    return {
      users: [],
      pagination: {},
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  watch: {
    // eslint-disable-next-line
    searchQuery: _.debounce(function(query){
      this.fetchUsers({
        by_name: query || null,
        by_resource_id: this.$route.params.id,
        by_active_status: true,
        meta: {
          pagination: {
            per_page: this.pagination.per_page,
          },
        },
      })
        .then(response => {
          this.users = response.data.data
        })
    }, 500),
  },
  beforeMount() {
    this.fetchUsers({
      by_resource_id: this.$route.params.id,
      by_active_status: true,
    })
      .then(response => {
        this.users = response.data.data
        this.pagination = response.data.meta.pagination
      })
  },
  methods: {
    ...mapActions('app-user', ['fetchUsers']),
    ...mapActions('users', ['editUser']),
    setUsers(users) {
      this.users = users.data
      this.pagination = users.meta.pagination
    },
    handlePagination({ page, per_page }) {
      this.fetchUsers({
        by_resource_id: this.$route.params.id,
        by_active_status: true,
        meta: {
          pagination: {
            page,
            per_page,
          },
        },
      })
        .then(response => {
          this.users = response.data.data
          this.pagination = response.data.meta.pagination
        })
    },
    disableUser(user) {
      this.$swal({
        title: '¿Estás seguro?',
        text: user.active_status ? 'El usuario perdera el acceso a su cuenta, puedes revertir esta operacion cuando tu quieras' : 'El usuario podra acceder de nuevo a su cuenta',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: user.active_status ? 'seee, borralo!' : 'si, reactivar usuario',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.editUser({
            id: user.id,
            user: {
              active_status: !user.active_status,
            },
          })
          this.$swal({
            icon: 'success',
            title: user.active_status ? 'Borrado!' : 'Reactivado!',
            text: user.active_status ? 'el usuario ya no está activo!' : 'El usuario esta activo de nuevo',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
