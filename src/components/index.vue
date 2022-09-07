<template>
  <div>
    <inspect></inspect>
    <change></change>
    <release></release>
    <permission-management></permission-management>
    <cooperation></cooperation>
    <problem></problem>
    <working-plan></working-plan>
  </div>
</template>

<script>
import Inspect from '@/components/1_inspect'
import Change from '@/components/2_change'
import Release from '@/components/3_release'
import PermissionManagement from '@/components/4_permissionManagement'
import Cooperation from '@/components/5_cooperation'
import Problem from '@/components/6_problem'
import WorkingPlan from '@/components/7_workingPlan'

export default {
  name: "Reports",
  components: {
    Inspect,
    Change,
    Release,
    PermissionManagement,
    Cooperation,
    Problem,
    WorkingPlan
  }
}
</script>

<style scoped>

</style>
