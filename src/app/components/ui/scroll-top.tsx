import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Fab, useScrollTrigger } from '@mui/material'
import { type ReactNode } from 'react'

interface ScrollTopProps {
  children?: ReactNode
  window?: () => Window
}

function ScrollTop(props: ScrollTopProps) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  })

  const handleClick = () => {
    const anchor = document.querySelector('#back-to-top-anchor')
    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      })
    }
  }

  return (
    <Box onClick={handleClick} role='presentation' sx={{ position: 'fixed', bottom: 16, right: 16 }}>
      {trigger ? (
        <Fab color='primary' size='small' aria-label='scroll back to top'>
          {children || <KeyboardArrowUpIcon />}
        </Fab>
      ) : null}
    </Box>
  )
}

export default ScrollTop
