import type { Popup } from '@/types/PopupType'

export function openPopup(popup: Popup) {
  popup.show = true
}
export function closePopup(popup: Popup) {
  popup.show = false
}
