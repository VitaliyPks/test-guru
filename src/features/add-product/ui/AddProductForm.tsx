import { Button, Input } from "@shared/ui";

import { useAddProductForm } from "../lib";

import "./AddProductFrom.scss";

interface IAddProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AddProductForm = ({
  onSuccess,
  onCancel,
}: IAddProductFormProps) => {
  const base = "add-product-form";

  const { formData, errors, loading, handleChange, handleClear, handleSubmit } =
    useAddProductForm(onSuccess);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  return (
    <>
      <div className={base}>
        <form onSubmit={onSubmit} className={`${base}__form`}>
          <div className={`${base}__field`}>
            <label className={`${base}__label`} htmlFor="title">
              Наименование
              <span className={`${base}__label-required`}>*</span>
            </label>
            <Input
              name="title"
              value={formData.title}
              placeholder="Введите наименование товара"
              onChange={handleChange}
              disabled={loading}
              clearValue={() => handleClear("title")}
            />
            {errors.title && (
              <span className={`${base}__error-text`}>{errors.title}</span>
            )}
          </div>
          <div className={`${base}__field`}>
            <label className={`${base}__label`} htmlFor="price">
              Цена, ₽<span className={`${base}__label-required`}>*</span>
            </label>
            <Input
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              placeholder="0.00"
              onChange={handleChange}
              disabled={loading}
            />
            {errors.price && (
              <span className={`${base}__error-text`}>{errors.price}</span>
            )}
          </div>
          <div className={`${base}__field`}>
            <label className={`${base}__label`} htmlFor="brand">
              Вендор
              <span className={`${base}__label-required`}>*</span>
            </label>
            <Input
              name="brand"
              value={formData.brand}
              placeholder="Введите производителя"
              onChange={handleChange}
              disabled={loading}
              clearValue={() => handleClear("brand")}
            />
            {errors.brand && (
              <span className={`${base}__error-text`}>{errors.brand}</span>
            )}
          </div>

          <div className={`${base}__field`}>
            <label className={`${base}__label`} htmlFor="sku">
              Артикул
              <span className={`${base}__label-required`}>*</span>
            </label>
            <Input
              name="sku"
              value={formData.sku}
              placeholder="Введите артикул"
              onChange={handleChange}
              disabled={loading}
              clearValue={() => handleClear("sku")}
            />
            {errors.sku && (
              <span className={`${base}__error-text`}>{errors.sku}</span>
            )}
          </div>

          <div className={`${base}__actions`}>
            <Button mode="error" onClick={onCancel} disabled={loading}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Добавление..." : "Добавить"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
