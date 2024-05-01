import { useState, useEffect } from 'react'
import { sizeToObject } from '../utils/size'
import { getDefaultContent } from '../utils/getDefaultContent'

//import Pen from '../components/Pen'
import dynamic from 'next/dynamic'
const Pen = dynamic(() => import('../components/Pen'), {
  ssr: false,
})

const Dashboard = dynamic(() => import('../components/Dashboard'), {
  ssr: false,
})

export default function App({...props }) {
  let isEditPage = false
  if (props.page === "create") {
    isEditPage = true
  }
  const [initialContent, setContent] = useState(props.initialContent)
  const id = props.initialContent?.ID || 'content'
  
  if (isEditPage) {
    useEffect(() => {
      try {
        const data = JSON.parse(localStorage.getItem(id))
        if (data) {
          setContent(data)
        }
      } catch (error) {}
    }, [id])
  }

  return (
    <>
      {isEditPage ? 
        (<Pen {...props} initialContent={initialContent} />
        ) : (
          <div><Dashboard/></div>
        )
      }
    </>
  )
}

export async function getServerSideProps({ params, res, query }) {

  if (!params.slug ||(params.slug.length === 1 && params.slug[0] === 'create')) {
    const layoutProps = {
      initialLayout: 'vertical',
      initialActiveTab:'html',
    }
    return {
      props: {
        initialContent: await getDefaultContent(),
        ...layoutProps,
        page: "create"
      },
    }
  }
  return {
    props: {
      page: "dashboard"
    }
  }
}
