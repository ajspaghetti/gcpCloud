require 'rails_helper'

RSpec.describe ItemsController, type: :controller do
  # Setup test data using FactoryBot
  let!(:user) { create(:user) }
  let!(:category) { create(:category) }  # Creates a single category
  let!(:items) { create_list(:item, 3, user: user, category: category) }
  let(:item_id) { items.first.id }

  # Test suite for GET /items
  describe 'GET #index' do
    before { get :index }

    it 'returns a successful response' do
      expect(response).to be_successful
    end

    it 'returns all items' do
      json_response = JSON.parse(response.body)
      expect(json_response.size).to eq(3)
    end
  end

  # Test suite for GET /items/:id
  describe 'GET #show' do
    context 'when the item exists' do
      before { get :show, params: { id: item_id } }

      it 'returns the item' do
        json_response = JSON.parse(response.body)
        expect(json_response['id'].to_s).to eq(item_id.to_s)
      end

      it 'returns a successful response' do
        expect(response).to be_successful
      end
    end

    context 'when the item does not exist' do
      before { get :show, params: { id: 0 } }

      it 'returns an error message' do
        expect(response.body).to include('Item not found')
      end

      it 'returns a not found status' do
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  # Test suite for POST /items
  describe 'POST #create' do
    let(:valid_attributes) { { title: 'Learn RSpec', description: 'Learn how to use RSpec with Rails', completed: false, user_id: user.id, category_id: category.id } }

    context 'when the request is valid' do
      before { post :create, params: { item: valid_attributes } }

      it 'creates a new item' do
        expect(response.body).to include('Learn RSpec')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(:created)
      end
    end

    context 'when the request is invalid' do
      before { post :create, params: { item: { title: '' } } }

      it 'returns status code 422' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns a validation failure message' do
        expect(response.body).to include("can't be blank")
      end
    end
  end

  # Test suite for PUT /items/:id
  describe 'PUT #update' do
    let(:valid_attributes) { { title: 'Updated Title' } }

    context 'when the item exists' do
      before { put :update, params: { id: item_id, item: valid_attributes } }

      it 'updates the item' do
        updated_item = Item.find(item_id)
        expect(updated_item.title).to match(/Updated Title/)
      end

      it 'returns a successful response' do
        expect(response).to be_successful
      end
    end
  end

  # Test suite for DELETE /items/:id
  describe 'DELETE #destroy' do
    before { delete :destroy, params: { id: item_id } }

    it 'returns status code 204' do
      expect(response).to have_http_status(:no_content)
    end

    it 'removes the item from the database' do
      expect(Item.where(id: item_id)).to be_empty
    end
  end
end
