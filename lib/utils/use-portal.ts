'use client'

import { useRef, useEffect } from 'react'

function createRootElement(id: string) {
  const rootContainer = document.createElement('div')
  rootContainer.setAttribute('id', id)
  return rootContainer
}

function addRootElement(rootElement: HTMLElement) {
  document.body.insertBefore(
    rootElement,
    document.body.lastElementChild?.nextElementSibling ?? null
  )
}

function usePortal(id: string) {
  const rootElemRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const existingParent = document.querySelector(`#${id}`)
    const parentElem = existingParent || createRootElement(id)

    if (!existingParent) {
      addRootElement(parentElem as HTMLElement)
    }

    parentElem.appendChild(getRootElem())

    return () => {
      rootElemRef.current?.remove()
      if (parentElem.childNodes.length === 0) {
        parentElem.remove()
      }
    }
  }, [id])

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div')
    }
    return rootElemRef.current
  }

  return getRootElem()
}

export default usePortal
