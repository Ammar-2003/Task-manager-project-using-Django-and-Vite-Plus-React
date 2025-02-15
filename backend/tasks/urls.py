from django.urls import path
from .views import (
    create_task,
    list_tasks,
    retrieve_task,
    update_task,
    delete_task,
    mark_task_completed,
)
urlpatterns = [
    path('', list_tasks, name='list-tasks'),
    path('createtask/', create_task, name='create-task'),
    path('retrievetasks/<int:pk>/', retrieve_task, name='retrieve-task'),
    path('updatetasks/<int:pk>/update/', update_task, name='update-task'),
    path('deletetasks/<int:pk>/delete/', delete_task, name='delete-task'),
    path('completedtasks/<int:pk>/', mark_task_completed, name='mark-task-completed'),
]