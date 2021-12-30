import { useRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import Modal from '../Modal'
import Input from '../Input'

interface FoodData {
  available: boolean
  description: string
  id: string
  image: string
  name: string
  price: string
}

interface ModalEditFoodProps {
  editingFood: FoodData
  handleUpdateFood: Function
  isOpen: boolean
  setIsOpen: () => void
}

const ModalEditFood = ({
  editingFood,
  handleUpdateFood,
  isOpen,
  setIsOpen
}: ModalEditFoodProps) => {
  const formRef = useRef(null)

  const handleSubmit = async (data: FoodData) => {
    handleUpdateFood(data)
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalEditFood
