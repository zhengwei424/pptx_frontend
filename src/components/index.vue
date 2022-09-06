<template>
  <div>
    <inspect></inspect>
    <change></change>
    <release></release>
    <permission-management></permission-management>
    <cooperation></cooperation>
    <problem></problem>
    <cluster-info></cluster-info>
  </div>
</template>

<script>
import Inspect from '@/components/1_inspect'
import Change from '@/components/2_change'
import Release from '@/components/3_release'
import PermissionManagement from '@/components/4_permissionManagement'
import Cooperation from '@/components/5_cooperation'
import Problem from '@/components/6_problem'
import ClusterInfo from '@/components/7_clusterInfo'

export default {
  name: "Reports",
  components: {
    Inspect,
    Change,
    Release,
    PermissionManagement,
    Cooperation,
    Problem,
    ClusterInfo
  }
}
</script>

<style scoped>

</style>