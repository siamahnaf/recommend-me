import React, { useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";
import { FieldErrors } from "react-hook-form";
import moment from "moment";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_SEARCH_MOVIES } from "@/Query/Function/movies";
import { Result } from "@/Query/Types/movies";


//Interface
export interface Inputs {
    movie_name: string;
}

interface Props {
    errors: FieldErrors<Inputs>;
    onSelect: (selected: Result) => void;
}

const Autocomplete = ({ errors, onSelect }: Props) => {
    //State
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [open, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    //Query
    const { data } = useQuery({ queryKey: ["movies", inputValue], queryFn: () => GET_SEARCH_MOVIES(inputValue) });
    const options = data?.results || [];

    //Ref
    const autocompleteRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    //Handle On Change
    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        setOpen(true);
        setHighlightedIndex(-1);
    };

    //Keyboard Navigation
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
            scrollOptionIntoView(-1);
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            setHighlightedIndex((prevIndex) =>
                prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex
            );
            scrollOptionIntoView(1);
        } else if (
            event.key === "Enter" &&
            highlightedIndex >= 0 &&
            highlightedIndex < options.length
        ) {
            event.preventDefault();
            setInputValue(options[highlightedIndex].original_name as string || options[highlightedIndex].original_title as string);
            onSelect(options[highlightedIndex]);
            setOpen(false);
            setHighlightedIndex(-1);
        }
    };

    //On Suggestion Close
    const handleBlur = () => {
        setOpen(false);
    };

    //Scroll Into view
    const scrollOptionIntoView = (direction: number) => {
        if (listRef.current && highlightedIndex >= 0) {
            const optionElement = listRef.current.children[highlightedIndex] as HTMLElement;
            if (optionElement) {
                const { offsetTop, offsetHeight } = optionElement;
                const { scrollTop, clientHeight } = listRef.current;
                const optionTop = (offsetTop - offsetHeight) - 16;
                const optionBottom = optionTop + listRef.current.offsetTop + offsetHeight + 65
                if (optionTop < scrollTop && direction === -1) {
                    listRef.current.scrollTop = optionTop;
                } else if (optionBottom > scrollTop + clientHeight && direction === 1) {
                    listRef.current.scrollTop = optionBottom - clientHeight;
                }
            }
        }
    };

    //Handler
    const handleItemClick = (item: Result) => {
        setInputValue(item.original_name as string || item.original_title as string);
        onSelect(item);
        setOpen(false);
    };

    //Hook Call
    useOutsideClick(autocompleteRef, handleBlur);

    return (
        <div className="relative mt-3" ref={autocompleteRef}>
            <input
                placeholder="Movie Name"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={inputValue}
                onClick={() => setOpen(true)}
                autoComplete="off"
                className={`w-full py-2.5 px-3 bg-slate-600 focus:outline-none rounded border border-solid ${errors.movie_name ? "border-amber-600" : "border-transparent"}`}
            />
            <ul
                className={`absolute bg-stone-800 shadow-lg rounded-md max-h-[350px] p-2 overflow-auto left-0 top-full scrollbar-thin scrollbar-track-slate-500 scrollbar-thumb-slate-600 scrollbar-track-rounded-md scrollbar-thumb-rounded-md z-10 w-full ${open && options.length as number > 0 && inputValue ? "visible opacity-100" : "opacity-0 invisible"}`}
                ref={listRef}
            >
                {options.map((option, i) => (
                    <li
                        key={i}
                        className={`my-1 px-3 py-2 text-base rounded cursor-pointer hover:bg-slate-600 ${highlightedIndex === i ? "bg-slate-600 text-white" : ""}`}
                        onClick={() => handleItemClick(option)}
                    >
                        <span>{option.original_name || option.original_title}{" "}</span>
                        <span className="text-orange-500">({moment(option.release_date).format("YYYY")})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Autocomplete;

const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
};