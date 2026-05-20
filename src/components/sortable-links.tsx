"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { reorderLinks } from "@/app/dashboard/actions";

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
  links,
}: {
  links: LinkItem[];
}) {
  const router = useRouter();
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

    const form = new FormData();
    form.set("ids", JSON.stringify(reordered.map((l) => l.id)));
    await reorderLinks(form);

    setDragging(false);
    dragIndex.current = null;
    overIndex.current = null;
    router.refresh();
  }

  return (
    <div className="stack">
      {links.map((link, index) => {
        const isDragged = dragging && dragIndex.current === index;
        return (
          <article
            className={`link-row sortable-row ${isDragged ? "is-dragging" : ""}`}
            key={link.id}
            onDragOver={(e) => onDragOver(e, index)}
            onDrop={onDrop}
          >
            <div
              className="drag-handle"
              title="Дръпни за пренареждане"
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragEnd={onDragEnd}
            >
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
            </div>
          </article>
        );
      })}
    </div>
  );
}
