export interface ScheduleEvent {
  id: number;
  study_room_id: number;
  title: string;
  description: string;
  event_date: string; // YYYY-MM-DD 형식의 날짜
  start_time: string; // HH:mm:ss 형식의 시간
  event_type: string;
  created_by: string; // UUID로 보이는 값
  created_at: string; // ISO 형식의 날짜와 시간
}
