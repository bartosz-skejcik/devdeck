import { IEvent } from "@/types";
import { useState } from "react";

const useCalendar = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(false);
};
