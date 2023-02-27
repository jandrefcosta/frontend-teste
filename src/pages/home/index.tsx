import { useEffect, useRef, useState } from 'react'
import { AddCard, GetAllCards, UpdateCard, DeleteCard } from '../../services/cards.service';
import { groupBy } from "lodash";

import DOMPurify from 'isomorphic-dompurify';
import Markdown from 'marked-react';
import { ButtonAccept, ButtonAdd, ButtonCancel, ButtonDelete, ButtonEdit, ButtonNextArrow, ButtonPrevArrow } from '../../components/buttons';

export default function HomePage() {

    const tituloRef = useRef<HTMLInputElement>(null);
    const conteudoRef = useRef<HTMLTextAreaElement>(null);

    const tituloEditingRef = useRef<HTMLInputElement>(null);
    const conteudoEditingRef = useRef<HTMLTextAreaElement>(null);

    const [cards, setCards] = useState<any>();
    const [editingItem, setEditingItem] = useState<any>()

    useEffect(() => {
        GetCards();
    }, [])

    async function HandleAddButton(e: any) {
        const request = { titulo: tituloRef.current?.value, conteudo: conteudoRef.current?.value, lista: "ToDo" }
        const data = await AddCard(request);
        GetCards();
    }

    async function GetCards() {
        const data = await GetAllCards();
        setCards(groupBy(data, "lista"))
    }

    function HandleEdit(item: any): void {
        setEditingItem(item);
    }

    function HandleCancel(): void {
        setEditingItem(null);
    }

    async function UpdateCardList(item: any, lista: string) {
        const request = { ...item, lista }
        const data = await UpdateCard(request);
        GetCards();
    }

    async function HandleUpdateItem() {
        const request = { ...editingItem, titulo: tituloEditingRef.current?.value, conteudo: conteudoEditingRef.current?.value }
        const data = await UpdateCard(request);
        setEditingItem(null);
        GetCards();
    }

    async function DeleteUpdateItem(request: any) {
        const data = await DeleteCard(request);
        setCards(groupBy(data, "lista"))
    }

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32 px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900">Kanban Board</h2>
                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
                    <div className="group relative">
                        <h3 className="text-3xl">NOVO</h3>
                        <div className="flex flex-col">
                            <div className="flex flex-col items-center bg-slate-200 overflow-hidden rounded-lg p-8 mt-4 max-w-sm rounded-lg bg-grey shadow-lg">
                                <input className="mb-2 w-full" placeholder="Titulo" ref={tituloRef} />
                                <textarea className="w-full" placeholder="Conteúdo" cols={4} rows={4} style={{ 'resize': 'none' }} ref={conteudoRef} />
                                <div className="flex justify-center  w-full mt-4">
                                    <ButtonAdd onClick={HandleAddButton} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="group relative p-2" style={{ backgroundColor: "#d94169" }}>
                        <h3 className="text-3xl">TO-DO</h3>
                        <div className="flex flex-col">
                            {cards && cards["ToDo"]?.map((item: any) => {
                                return (
                                    item.id !== editingItem?.id ?
                                        <div className="flex flex-col relative bg-slate-200 overflow-hidden rounded-lg mt-4 max-w-sm rounded-lg shadow-lg"
                                            style={{ backgroundColor: "#d9c541" }}
                                            key={item.id}>
                                            <div className="flex top-0 left-0 justify-end w-full mb-2">
                                                <ButtonNextArrow onClick={() => UpdateCardList(item, 'Doing')} />
                                            </div>
                                            <div className='px-8 pb-8'>
                                                <h4 className='text-base font-bold text-left mb-4'> {item.titulo}</h4>
                                                {/* <div dangerouslySetInnerHTML={{ __html: item.conteudo }} /> */}
                                                <Markdown value={DOMPurify.sanitize(item.conteudo)} breaks={true} gfm={true} />
                                                <div className="flex justify-center w-full mt-4">
                                                    <ButtonEdit onClick={(e: any) => HandleEdit(item)} />
                                                    <ButtonDelete onClick={(e: any) => DeleteUpdateItem(item)} />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="flex flex-col relative items-center bg-slate-200 overflow-hidden rounded-lg p-8 mt-4 max-w-sm rounded-lg bg-grey shadow-lg" key={item.id}>
                                            <input className="mb-2 w-full" placeholder="Titulo" defaultValue={item.titulo} ref={tituloEditingRef} />
                                            <textarea className="w-full" placeholder="Conteúdo" cols={4} rows={4} style={{ 'resize': 'none' }} defaultValue={item.conteudo} ref={conteudoEditingRef} />
                                            <div className="flex justify-center w-full mt-4">
                                                <ButtonCancel onClick={HandleCancel} />
                                                <ButtonAccept onClick={HandleUpdateItem} />
                                            </div>
                                        </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="group relative p-2" style={{ backgroundColor: "#4f4dde" }}>
                        <h3 className="text-3xl">DOING</h3>
                        <div className="flex flex-col">
                            {cards && cards["Doing"]?.map((item: any) => {
                                return (
                                    item.id !== editingItem?.id ?
                                        <div className="flex flex-col relative bg-slate-200 overflow-hidden rounded-lg mt-4 max-w-sm rounded-lg bg-grey shadow-lg"
                                            style={{ backgroundColor: "#d9c541" }}
                                            key={item.id}>
                                            <div className="flex top-0 left-0 justify-between w-full mb-2">
                                                <ButtonPrevArrow onClick={() => UpdateCardList(item, 'ToDo')} />
                                                <ButtonNextArrow onClick={() => UpdateCardList(item, 'Done')} />
                                            </div>
                                            <div className='px-8 pb-8'>
                                                <h4 className='text-base font-bold text-left mb-4'> {item.titulo}</h4>
                                                {/* <div dangerouslySetInnerHTML={{ __html: item.conteudo }} /> */}
                                                <Markdown value={DOMPurify.sanitize(item.conteudo)} breaks={true} gfm={true} />
                                                <div className="flex justify-center w-full mt-4">
                                                    <ButtonEdit onClick={(e: any) => HandleEdit(item)} />
                                                    <ButtonDelete onClick={(e: any) => DeleteUpdateItem(item)} />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="flex flex-col relative items-center bg-slate-200 overflow-hidden rounded-lg p-8 mt-4 max-w-sm rounded-lg bg-grey shadow-lg" key={item.id}>
                                            <input className="mb-2 w-full" placeholder="Titulo" defaultValue={item.titulo} ref={tituloEditingRef} />
                                            <textarea className="w-full" placeholder="Conteúdo" cols={4} rows={4} style={{ 'resize': 'none' }} defaultValue={item.conteudo} ref={conteudoEditingRef} />
                                            <div className="flex justify-center w-full mt-4">
                                                <ButtonCancel onClick={HandleCancel} />
                                                <ButtonAccept onClick={HandleUpdateItem} />
                                            </div>
                                        </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="group relative p-2" style={{ backgroundColor: "#69d941" }}>
                        <h3 className="text-3xl">DONE</h3>
                        <div className="flex flex-col">
                            {cards && cards["Done"]?.map((item: any) => {
                                return (
                                    item.id !== editingItem?.id ?
                                        <div className="flex flex-col relative bg-slate-200 overflow-hidden rounded-lg mt-4 max-w-sm rounded-lg bg-grey shadow-lg"
                                            style={{ backgroundColor: "#d9c541" }}
                                            key={item.id}>
                                            <div className="flex top-0 left-0 w-full mb-2">
                                                <ButtonPrevArrow onClick={() => UpdateCardList(item, 'Doing')} />
                                            </div>
                                            <div className='px-8 pb-8'>
                                                <h4 className='text-base font-bold text-left mb-4'> {item.titulo}</h4>
                                                {/* <div dangerouslySetInnerHTML={{ __html: item.conteudo }} /> */}
                                                <Markdown value={DOMPurify.sanitize(item.conteudo)} breaks={true} gfm={true} />
                                                <div className="flex justify-center w-full mt-4">
                                                    <ButtonEdit onClick={(e: any) => HandleEdit(item)} />
                                                    <ButtonDelete onClick={(e: any) => DeleteUpdateItem(item)} />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="flex flex-col relative items-center bg-slate-200 overflow-hidden rounded-lg p-8 mt-4 max-w-sm rounded-lg bg-grey shadow-lg" key={item.id}>
                                            <input className="mb-2 w-full" placeholder="Titulo" defaultValue={item.titulo} ref={tituloEditingRef} />
                                            <textarea className="w-full" placeholder="Conteúdo" cols={4} rows={4} style={{ 'resize': 'none' }} defaultValue={item.conteudo} ref={conteudoEditingRef} />
                                            <div className="flex justify-center w-full mt-4">
                                                <ButtonCancel onClick={HandleCancel} />
                                                <ButtonAccept onClick={HandleUpdateItem} />
                                            </div>
                                        </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}