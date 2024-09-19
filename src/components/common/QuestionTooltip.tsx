import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Question from '../icons/Header/Question'

export function QuestionTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>
            <Question />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>참여중인 스터디를 클릭하시면 해당 스터디룸으로 이동합니다.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
