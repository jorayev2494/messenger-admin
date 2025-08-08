import { onMounted, reactive, ref, toRef, toRefs, type Ref, type ToRef } from 'vue'
import { usePermissionStore } from '../../store/permission'
import type { PermissionInterface } from '../../entities/contracts/PermissionInterface'
import { useI18n } from 'vue-i18n'

export default function ({ props }) {
  const store = usePermissionStore()
  const { t } = useI18n()
  const groupedActions = ref([])
  const slots = ref([])
  // const permissionIds = ref(props.permissionIds)
  console.log('permissionIds props: ', props)
  // const permissionIds = ref(props.permissionIds)
  const permissionIds: Ref<number[]> = toRef(props, 'permissionIds')

  // const columns: object[] = [
  //   { field: 'value', title: t('role.columns.value') },
  //   // { field: 'description', title: t('role.columns.description') },
  //   {
  //     field: 'actions',
  //     title: t('system.actions'),
  //     sort: false,
  //     headerClass: 'float-end',
  //     cellClass: 'float-end',
  //   },
  // ]

  const makeSlots = () => {
    permissions.value.reduce((result: string[], cVal) => {
      if (result.some((el) => el.slug === cVal.action)) {
        return result
      }

      result.push({ slug: cVal.action })

      return result
    }, slots.value)
  }

  const permissions: Ref<PermissionInterface[]> = ref([])

  const cols: Ref<{ field: string; title: string }[]> = ref([
    {
      field: 'label',
      // field: 'manager.index.resource',
      title: 'title',
      // rowClass: 'bg-primary text-light',
      // headerClass: 'bg-primary text-light',
      cellClass: 'bg-primary text-light',
    },
  ])

  const rows: Ref<{ label: string }[]> = ref([])

  const groupBy = <T>(key: string, key2: string, el: T[], toSave: object[] = []): object[] => {
    const obj = el.reduce((result: any, currentValue: any): object => {
      const item = {
        label: currentValue?.resource?.toUpperCase(),
        actions: {},
      }

      ;(result[currentValue[key]] = result[currentValue[key]] || item).actions[currentValue[key2]] =
        currentValue

      return result
    }, toSave)

    const res = []
    for (const o in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, o)) {
        const element = obj[o]
        res.push(element)
      }
    }

    return res
  }

  const loadPermissions = () => {
    store.loadPermissionsAsync().then((response) => {
      const { data } = response

      permissions.value = data
      groupedActions.value = groupBy('resource', 'action', permissions.value)
      makeColumns()
      makeRows()
      makeSlots()
      // console.log('groupBy: ', groupedActions.value = [groupBy('resource', 'action', permissions.value, {})])
    })
  }

  const makeColumns = () => {
    permissions.value.forEach(({ resource, action }: PermissionInterface, idx: number) => {
      const col = {
        field: `actions.${action}.action`,
        title: action, // ?.toUpperCase(),
        // headerClass: 'float-none',
        // cellClass: 'text-center',
        cellClass: 'bg-secondary-subtle text-light',
      }
      if (!cols.value.some(({ title }) => title === action)) {
        cols.value.push(col)
      }
    })
  }

  const makeRows = () => {
    permissions.value.forEach(({ resource, action }: PermissionInterface) => {
      const row = { label: resource, actions: [action] }
      if (!rows.value.some(({ label }) => label === resource)) {
        rows.value.push(row)
      }
    })
  }

  const changePermissions = ({ id }: PermissionInterface, checked: boolean): void => {
    if (checked) {
      permissionIds.value.push(id)
    } else {
      const idx = permissionIds.value.findIndex((el: number): boolean => el === id)
      if (idx > -1) {
        permissionIds.value.splice(idx, 1)
      }
    }
  }

  const hasInPermissionIds = (id: number): boolean => permissionIds.value.includes(id)

  onMounted(() => {
    loadPermissions()
  })

  return {
    cols,
    rows,
    permissions,
    groupedActions,
    slots,
    permissionIds,
    hasInPermissionIds,
    changePermissions,
  }
}
