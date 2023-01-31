import { Grid} from 'semantic-ui-react'
import { Outlet } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'


function Layout({loggedUser, handleLogout}) {
	return ( 
		<Grid columns={3}>
			<Grid.Row>
				<Grid.Column verticalAlign='left'>
					<PageHeader loggedUser={loggedUser}  handleLogout={handleLogout}/>
				</Grid.Column>
			</Grid.Row>
				<Grid.Column>

				</Grid.Column>
			<Grid.Row>
				<Grid.Column textAlign='right'>
					<Outlet />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	 );
}

export default Layout;