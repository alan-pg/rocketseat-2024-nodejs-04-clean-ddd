import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsRequest {
  page: number
  questionId: string
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({ questionComments })
  }
}
