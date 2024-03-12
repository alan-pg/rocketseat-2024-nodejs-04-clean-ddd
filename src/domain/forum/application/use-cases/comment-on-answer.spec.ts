import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository'
import { makeAnswer } from '../../../../../test/factory/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswerAttachmentsRepository } from '../../../../../test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository

let sut: CommentOnAnswerUseCase

describe('Comment On Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Comentário teste',
    )
  })
})
