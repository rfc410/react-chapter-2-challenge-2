import { useEffect, useState } from 'react'

import Header from '../../components/Header'
import api from '../../services/api'
import Food from '../../components/Food'
import ModalAddFood from '../../components/ModalAddFood'
import ModalEditFood from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'

interface FoodData {
  available: boolean
  description: string
  image: string
  id: string
  name: string
  price: string
}

interface AddFoodData {
  description: string
  image: string
  name: string
  price: string
}

const Dashboard = () => {
  const [foods, setFoods] = useState<FoodData[]>([])
  const [editingFood, setEditingFood] = useState<FoodData>({
    available: false,
    description: '',
    image: '',
    id: '',
    name: '',
    price: ''
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await api.get('/foods')
      setFoods(response.data)
    }
    fetchFoods()
  }, [])

  const handleAddFood = async (food: AddFoodData) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true
      })
      setFoods((foods) => [...foods, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateFood = async (food: FoodData) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood?.id}`,
        { ...editingFood, ...food }
      )
      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      )
      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteFood = async (id: string) => {
    await api.delete(`/foods/${id}`)
    const foodsFiltered = foods.filter(food => food.id !== id)
    setFoods(foodsFiltered)
  }

  const toggleModal = () => {
    setModalOpen(prevModalOpen => !prevModalOpen)
  }

  const toggleEditModal = () => {
    setEditModalOpen(prevEditModalOpen => !prevEditModalOpen)
  }

  const handleEditFood = (food: FoodData) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}

export default Dashboard