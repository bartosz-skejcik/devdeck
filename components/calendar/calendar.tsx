import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDayClassName } from "./utils";
import { FC, ReactNode } from "react";
import { useDatePicker } from "@rehookify/datepicker";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/types";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";

interface RowProps {
    className?: string;
    children?: ReactNode;
}

export const Row: FC<RowProps> = ({ className, children }) => {
    return (
        <div className={clsx("grid grid-cols-7 gap-0 pt-4", className)}>
            {children}
        </div>
    );
};

interface CalendarProps {
    selectedDates: Date[];
    onDatesChange: (dates: Date[]) => void;
    events: IEvent[];
}

export const Calendar: FC<CalendarProps> = ({
    selectedDates,
    onDatesChange,
    events,
}) => {
    const {
        data: { calendars, weekDays },
        propGetters: { dayButton, addOffset, subtractOffset },
    } = useDatePicker({
        selectedDates,
        onDatesChange,
        calendar: {
            mode: "static",
            startDay: 1,
        },
    });

    const { month, year, days } = calendars[0];

    function dayIsInTheEvents(day: Date): IEvent[] {
        if (!events || events.length == 0) return [];
        const eventsThatDay = events.filter(
            (e) =>
                e.status !== "cancelled" &&
                new Date(e.start.dateTime).getDate() === day.getDate() &&
                new Date(e.start.dateTime).getMonth() === day.getMonth() &&
                new Date(e.start.dateTime).getFullYear() === day.getFullYear()
        );
        return eventsThatDay;
    }

    function isToday(day: Date) {
        const today = new Date();
        return (
            day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            day.getFullYear() === today.getFullYear()
        );
    }

    return (
        <section className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex items-center justify-between w-11/12">
                <Button
                    variant="outline"
                    size="icon"
                    className="flex items-center justify-center w-8 h-8 text-center"
                    {...subtractOffset({ months: 1 })}
                >
                    <ChevronLeft
                        size={24}
                        className="w-5 text-muted-foreground"
                    />
                </Button>
                <p className="text-base text-center">
                    {month} {year}
                </p>
                <Button
                    variant="outline"
                    size="icon"
                    className="flex items-center justify-center w-8 h-8 text-center"
                    {...addOffset({ months: 1 })}
                >
                    <ChevronRight
                        size={24}
                        className="w-5 text-muted-foreground"
                    />
                </Button>
            </div>
            <Row className="flex items-center justify-center w-full font-medium h-fit text-muted-foreground">
                {weekDays.map((d, idx) => (
                    <p key={idx} className="w-5/6 text-sm text-center h-fit">
                        {d.slice(0, 2)}
                    </p>
                ))}
            </Row>
            <Row className="w-full">
                {/* // TODO - create a separate component for each day so that the dayIsInTheEvents can be fixed so it isnt called everywhere  */}
                {/* //!! VERY RO-BUST */}
                {days.map((d) => (
                    <Popover key={d.$date.toString()}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                className={clsx(
                                    "w-5/6 text-xs aspect-square relative",
                                    isToday(d.$date) && "border border-border"
                                )}
                                // {...dayButton(d)}
                                onClick={() => {
                                    onDatesChange([d.$date]);
                                }}
                            >
                                {dayIsInTheEvents(d.$date).length > 0 && (
                                    <div className="absolute w-5 h-1 rounded-full bottom-1.5 bg-primary" />
                                )}
                                {d.day}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className={clsx(
                                "p-0",
                                dayIsInTheEvents(d.$date).length == 0 &&
                                    "bg-transparent border-transparent"
                            )}
                        >
                            {dayIsInTheEvents(d.$date) &&
                                dayIsInTheEvents(d.$date).map((e, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-center gap-2 p-2"
                                    >
                                        <div className="flex-1 w-1 h-full text-transparent rounded-full grow bg-primary">
                                            a
                                        </div>
                                        <div className="flex flex-col items-start justify-center w-full">
                                            <p className="text-sm font-medium text-left">
                                                {e.summary}
                                            </p>
                                            {e.description && (
                                                <p className="w-full mt-1 overflow-hidden text-xs text-left text-muted-foreground">
                                                    {e.description.slice(
                                                        0,
                                                        100
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </PopoverContent>
                    </Popover>
                ))}
            </Row>
        </section>
    );
};
