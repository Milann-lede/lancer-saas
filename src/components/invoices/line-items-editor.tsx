'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/utils/format'
import { Plus, Trash2 } from 'lucide-react'
import type { LineItem } from '@/types'

interface LineItemsEditorProps {
  initialItems?: LineItem[]
  onChange?: (items: LineItem[]) => void
}

const DEFAULT_ITEM: LineItem = { description: '', quantity: 1, unit_price: 0, vat_rate: 20 }

export function LineItemsEditor({ initialItems = [], onChange }: LineItemsEditorProps) {
  const [items, setItems] = useState<LineItem[]>(
    initialItems.length > 0 ? initialItems : [{ ...DEFAULT_ITEM }]
  )

  function update(index: number, field: keyof LineItem, value: string | number) {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: typeof value === 'string' && field !== 'description' ? parseFloat(value) || 0 : value } : item
    )
    setItems(updated)
    onChange?.(updated)
  }

  function addItem() {
    const updated = [...items, { ...DEFAULT_ITEM }]
    setItems(updated)
    onChange?.(updated)
  }

  function removeItem(index: number) {
    const updated = items.filter((_, i) => i !== index)
    setItems(updated)
    onChange?.(updated)
  }

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0)
  const vatAmount = items.reduce((sum, i) => sum + i.quantity * i.unit_price * (i.vat_rate / 100), 0)
  const total = subtotal + vatAmount

  return (
    <div className="space-y-4">
      {/* Hidden input for form submission */}
      <input type="hidden" name="line_items" value={JSON.stringify(items)} />

      {/* Header */}
      <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase px-1">
        <div className="col-span-5">Description</div>
        <div className="col-span-2 text-right">Qté</div>
        <div className="col-span-2 text-right">Prix HT</div>
        <div className="col-span-2 text-right">TVA %</div>
        <div className="col-span-1"></div>
      </div>

      {/* Items */}
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-5">
            <Input
              value={item.description}
              onChange={(e) => update(index, 'description', e.target.value)}
              placeholder="Prestation, développement..."
            />
          </div>
          <div className="col-span-2">
            <Input
              type="number"
              min="0"
              step="0.5"
              value={item.quantity}
              onChange={(e) => update(index, 'quantity', e.target.value)}
              className="text-right"
            />
          </div>
          <div className="col-span-2">
            <Input
              type="number"
              min="0"
              step="0.01"
              value={item.unit_price}
              onChange={(e) => update(index, 'unit_price', e.target.value)}
              className="text-right"
            />
          </div>
          <div className="col-span-2">
            <Input
              type="number"
              min="0"
              max="100"
              value={item.vat_rate}
              onChange={(e) => update(index, 'vat_rate', e.target.value)}
              className="text-right"
            />
          </div>
          <div className="col-span-1 flex justify-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeItem(index)}
              disabled={items.length === 1}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" size="sm" onClick={addItem}>
        <Plus className="w-4 h-4 mr-2" /> Ajouter une ligne
      </Button>

      {/* Totals */}
      <div className="border-t pt-4 space-y-2 ml-auto max-w-xs">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Sous-total HT</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>TVA</span>
          <span className="font-medium">{formatCurrency(vatAmount)}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900">
          <span>Total TTC</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
}
