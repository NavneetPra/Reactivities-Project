import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Grid, List } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import LoginForm from '../../users/LoginForm'
import ActivityFilters from './ActivityFilters'
import ActivityList from './ActivityList'

export default observer(function ActivityDashboard() {
  const { activityStore, userStore, commonStore, modalStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if (userStore.isLoggedIn) {
      if (activityRegistry.size <= 1) loadActivities();
    } else {
      modalStore.openModal(<LoginForm />);
      commonStore.redirect('/');
    }
  }, [activityRegistry.size, loadActivities, modalStore, commonStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

  return (
    <Grid>
      <Grid.Column width='10'>
        <List>
            <ActivityList />
          </List>
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  )
})
