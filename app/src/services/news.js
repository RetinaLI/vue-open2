import axiosApi from '@/http/axiosApi';

class NewsService {
  async getNews (page = {}) {
    let data = await axiosApi('getNews', page);
    return data;
  }
  async postNews (id = {}) {
    let data = await axiosApi('postNews', id);
    return data;
  }
}

export default NewsService;
