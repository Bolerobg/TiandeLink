"use client";

import { useRef, useState } from "react";
import { deleteLink, moveLink, reorderLinks, toggleLink, updateLink } from "@/app/dashboard/actions";

type LinkItem = {
  id: string;
  title: string;
  url: string;
  type: string;
  description: string | null;
  imageUrl: string | null;
  spotlight: boolean;
  isActive: boolean;
  startsAt: string;
  endsAt: string;
  clickCount: number;
};

export function SortableLinks({
  links: initialLinks,
}: {
  links: LinkItem[];
}) {
  const [links, setLinks] = useState(initialLinks);
  const dragIndex = useRef<number | null>(null);
  const overIndex = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);

  function onDragStart(e: React.DragEvent, index: number) {
    dragIndex.current = index;
    setDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  }

  function onDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    overIndex.current = index;
  }

  function onDragEnd() {
    setDragging(false);
    dragIndex.current = null;
    overIndex.current = null;
  }

  async function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const from = dragIndex.current;
    const to = overIndex.current;
    if (from === null || to === null || from === to) {
      setDragging(false);
      return;
    }

    const reordered = [...links];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setLinks(reordered);

    const form = new FormData();
    form.set("ids", JSON.stringify(reordered.map((l) => l.id)));
    await reorderLinks(form);

    setDragging(false);
    dragIndex.current = null;
    overIndex.current = null;
  }

  return (
    <div className="stack">
      {links.map((link, index) => {
        const isDragged = dragging && dragIndex.current === index;
        return (
          <article
            className={`link-row sortable-row ${isDragged ? "is-dragging" : ""}`}
            key={link.id}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
          >
            <div className="drag-handle" title="Дръпни за пренареждане">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
                <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
                <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong>{link.title}</strong>
              <p>{link.description || link.url}</p>
              <p>
                {link.type} · {link.clickCount} клика · {link.isActive ? "Активен" : "Скрит"}
                {link.startsAt ? ` · от ${new Date(link.startsAt).toLocaleDateString("bg")}` : ""}
                {link.endsAt ? ` · до ${new Date(link.endsAt).toLocaleDateString("bg")}` : ""}
              </p>
              <details className="link-editor">
                <summary>Редактирай</summary>
                <form className="form-grid compact-form" action={updateLink}>
                  <input type="hidden" name="id" value={link.id} />
                  <div className="two-col">
                    <div className="field">
                      <label htmlFor={`title-${link.id}`}>Заглавие</label>
                      <input id={`title-${link.id}`} name="title" defaultValue={link.title} required />
                    </div>
                    <div className="field">
                      <label htmlFor={`type-${link.id}`}>Тип</label>
                      <select id={`type-${link.id}`} name="type" defaultValue={link.type}>
                        <option value="URL">URL</option>
                        <option value="FEATURED">Featured</option>
                        <option value="PRODUCT">Product</option>
                        <option value="BOOKING">Booking</option>
                        <option value="EMAIL_CAPTURE">Email capture</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor={`url-${link.id}`}>URL</label>
                    <input id={`url-${link.id}`} name="url" type="url" defaultValue={link.url} required />
                  </div>
                  <div className="field">
                    <label htmlFor={`description-${link.id}`}>Описание</label>
                    <input id={`description-${link.id}`} name="description" defaultValue={link.description || ""} />
                  </div>
                  <div className="field">
                    <label htmlFor={`imageUrl-${link.id}`}>Картинка URL</label>
                    <input id={`imageUrl-${link.id}`} name="imageUrl" type="url" defaultValue={link.imageUrl || ""} />
                  </div>
                  <div className="two-col">
                    <div className="field">
                      <label htmlFor={`startsAt-${link.id}`}>От (дата/час)</label>
                      <input id={`startsAt-${link.id}`} name="startsAt" type="datetime-local" defaultValue={link.startsAt} />
                    </div>
                    <div className="field">
                      <label htmlFor={`endsAt-${link.id}`}>До (дата/час)</label>
                      <input id={`endsAt-${link.id}`} name="endsAt" type="datetime-local" defaultValue={link.endsAt} />
                    </div>
                  </div>
                  <label className="check-row">
                    <input name="spotlight" type="checkbox" defaultChecked={link.spotlight} />
                    <span>Spotlight линк</span>
                  </label>
                  <button className="button primary" type="submit">Запази линка</button>
                </form>
              </details>
            </div>
            <div className="link-actions">
              <form action={moveLink} onSubmit={(e) => e.stopPropagation()}>
                <input type="hidden" name="id" value={link.id} />
                <input type="hidden" name="direction" value="up" />
                <button className="button icon-button" disabled={index === 0} title="Нагоре" type="submit">↑</button>
              </form>
              <form action={moveLink} onSubmit={(e) => e.stopPropagation()}>
                <input type="hidden" name="id" value={link.id} />
                <input type="hidden" name="direction" value="down" />
                <button className="button icon-button" disabled={index === links.length - 1} title="Надолу" type="submit">↓</button>
              </form>
              <form action={toggleLink} onSubmit={(e) => e.stopPropagation()}>
                <input type="hidden" name="id" value={link.id} />
                <input type="hidden" name="active" value={String(link.isActive)} />
                <button className="button" type="submit">{link.isActive ? "Скрий" : "Покажи"}</button>
              </form>
              <form action={deleteLink} onSubmit={(e) => e.stopPropagation()}>
                <input type="hidden" name="id" value={link.id} />
                <button className="button danger" type="submit">Изтрий</button>
              </form>
            </div>
          </article>
        );
      })}
    </div>
  );
}
