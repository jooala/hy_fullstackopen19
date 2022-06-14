import User from './User'
import {
  TableContainer,
  Table,
  Paper,
  TableRow,
  TableHead,
  TableCell,
} from '@mui/material'

const UserList = ({ users }) => {
  return (
    <div>
      <TableContainer component={Paper} sx={{ maxWidth: 550 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Users </TableCell>
              <TableCell> Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
