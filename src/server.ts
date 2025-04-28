import { SimpleSearchService } from './service/SearchService';

const searchService = new SimpleSearchService();

console.log(searchService.search(
  '"THE KING"',
  [
  {
    "name": "The Lord of the Rings: The Return of the King",
    "image": "https://picsum.photos/640/480",
    "description": "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.",
    "dateLastEdited": "2018-05-19T12:33:25.545Z"
  },
  {
    "name": "The Lion King",
    "image": "https://picsum.photos/640/480",
    "description": "Quaerat in rerum. Possimus reprehenderit provident ea voluptatem qui et enim. Ducimus ea soluta esse modi quia.",
    "dateLastEdited": "2017-11-28T04:59:13.759Z"
  }]))