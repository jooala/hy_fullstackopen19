import { useParams } from 'react-router-dom'
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

const UserInfo = ({ users, blogs }) => {
  const id = useParams().id
  const user = users.find((u) => u.id === id)

  if (!user) {
    return null
  }

  const userBlogs = blogs.filter((blog) => blog.user.username === user.username)

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body1">Added blogs</Typography>
          <List>
            {userBlogs.map((blog) => (
              <ListItem key={blog.id}>
                <ListItemText>
                  <a href={`/blogs/${blog.id}`}>
                    {blog.title} by {blog.author}
                  </a>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserInfo
