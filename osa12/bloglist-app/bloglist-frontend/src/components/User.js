import { TableRow, TableCell } from '@mui/material'

const User = ({ user }) => {
  return (
    <TableRow>
      <TableCell>
        <a href={`/users/${user.id}`}>{user.name}</a>
      </TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
  )
}

export default User
