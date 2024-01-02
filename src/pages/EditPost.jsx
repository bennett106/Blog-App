import {useEffect, useState} from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/configuration'
import { useNavigate, useParams } from 'react-router'

function EditPost() {
    const [posts, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

  return  posts ? (
    <div className=' py-8'>
        <Container>
            <PostForm post={posts}/>
        </Container>
    </div>
  ) : null;
}

export default EditPost