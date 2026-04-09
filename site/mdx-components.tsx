import type { MDXComponents } from 'mdx/types'
import Steps from '@/components/article/Steps'
import Callout from '@/components/article/Callout'
import Tool from '@/components/article/Tool'
import ToolList from '@/components/article/ToolList'
import Stat from '@/components/article/Stat'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Steps,
    Callout,
    Tool,
    ToolList,
    Stat,
  }
}
